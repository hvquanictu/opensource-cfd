/* =========================================================================
   SITE CONFIG — edit this file to change contact details and the form backend.
   ========================================================================= */
window.SITE = {
  name: "OpenSource CFD",
  domain: "opensource-cfd.com",
  owner: "Dr. Van Quan Hoang",
  ownerVi: "TS. Hoàng Văn Quản",
  email: "hvquan@ictu.edu.vn",          // public contact e-mail (shown on the site)
  phone: "",                            // e.g. "+84 969 603 416" — leave empty to hide
  location: "Thai Nguyen, Vietnam · working worldwide",

  /* Contact form backend — every submission is e-mailed to you automatically.
     Web3Forms (recommended, free 250/month): go to https://web3forms.com, type your e-mail,
       copy the Access Key they send you into formAccessKey below. Keep formEndpoint as is.
     Formspree (alternative): create a form at https://formspree.io, put its URL
       (e.g. "https://formspree.io/f/xxxxabcd") in formEndpoint and leave formAccessKey empty.
     If formEndpoint is empty, the form falls back to opening the visitor's e-mail app. */
  formEndpoint: "https://api.web3forms.com/submit",
  formAccessKey: "117a884a-c708-4684-9158-b4365c933047",   // Web3Forms Access Key (public by design)

  /* Google Analytics 4 Measurement ID (Admin → Data streams → Website). Empty = no tracking.
     Only counted on the live site, not on localhost. */
  gaId: "G-X8PZH9D2TG",

  /* Optional booking link (Calendly, Cal.com, Google Calendar appointment page). Empty = hidden. */
  bookingUrl: "",

  github: "https://github.com/hvquanictu",
  scholar: "https://scholar.google.com/scholar?q=%22Van+Quan+Hoang%22+OpenFOAM",
  linkedin: "",

  /* Honest capacity message shown near the call-to-action. Update each month. */
  slotsThisMonth: 2
};
