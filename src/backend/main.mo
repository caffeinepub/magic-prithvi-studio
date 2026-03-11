import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type StudioInfo = {
    name : Text;
    tagline : Text;
    services : [Text];
    about : Text;
    location : Text;
    contact : Text;
  };

  type Booking = {
    id : Nat;
    name : Text;
    email : Text;
    service : Text;
    message : Text;
  };

  type MediaType = { #photo; #video };

  type MediaItem = {
    id : Nat;
    title : Text;
    description : Text;
    mediaType : MediaType;
    blob : Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
  };

  module MediaItem {
    public func compare(item1 : MediaItem, item2 : MediaItem) : Order.Order {
      Text.compare(item1.title, item2.title);
    };
  };

  let bookings = Map.empty<Nat, Booking>();
  let mediaItems = Map.empty<Nat, MediaItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextBookingId = 0;
  var nextMediaId = 0;
  var studioInfo : ?StudioInfo = null;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Studio Info Management
  public shared ({ caller }) func updateStudioInfo(info : StudioInfo) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update studio info");
    };
    studioInfo := ?info;
  };

  public query func getStudioInfo() : async ?StudioInfo {
    studioInfo;
  };

  // Booking Management
  public shared func submitBooking(name : Text, email : Text, service : Text, message : Text) : async () {
    let booking : Booking = {
      id = nextBookingId;
      name;
      email;
      service;
      message;
    };
    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
  };

  public query ({ caller }) func listBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view bookings");
    };
    bookings.values().toArray().sort(
      func(a, b) {
        Text.compare(a.name, b.name);
      }
    );
  };

  // Media Gallery Management
  public shared ({ caller }) func addMediaItem(title : Text, description : Text, mediaType : MediaType, blob : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add media items");
    };
    let mediaItem : MediaItem = {
      id = nextMediaId;
      title;
      description;
      mediaType;
      blob;
    };
    mediaItems.add(nextMediaId, mediaItem);
    nextMediaId += 1;
  };

  public shared ({ caller }) func deleteMediaItem(mediaId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete media items");
    };
    mediaItems.remove(mediaId);
  };

  public query func listMediaItems() : async [MediaItem] {
    mediaItems.values().toArray().sort();
  };
};
