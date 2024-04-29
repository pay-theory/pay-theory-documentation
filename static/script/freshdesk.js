window.fwSettings = {
  widget_id: 44000004239,
};
!(function () {
  if ('function' != typeof window.FreshworksWidget) {
    let n = function () {
      n.q.push(arguments);
    };
    // eslint-disable-next-line no-sequences
    (n.q = []), (window.FreshworksWidget = n);
  }
})();

FreshworksWidget('hide', 'launcher');
FreshworksWidget('hide', 'ticketForm', ['description', 'subject']);
FreshworksWidget('prefill', 'ticketForm', {
  subject: 'Requesting Sandbox',
  description: 'Sandbox request from our documentation quickstart',
});
