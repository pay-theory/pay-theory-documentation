window.fwSettings = {
  widget_id: 44000004239,
};

window.freshworkWidgetReady = false;

!(function () {
  if ('function' != typeof window.FreshworksWidget) {
    let n = function () {
      n.q.push(arguments);
    };
    n.q = [];
    window.FreshworksWidget = n;
  }
})();

// Function to initialize the widget
function initializeFreshworksWidget() {
  if (typeof FreshworksWidget === 'function') {
    FreshworksWidget('hide', 'launcher');
    FreshworksWidget('hide', 'ticketForm', ['description', 'subject']);
    FreshworksWidget('prefill', 'ticketForm', {
      subject: 'Requesting Sandbox',
      description: 'Sandbox request from our documentation quickstart',
    });
    window.freshworkWidgetReady = true;
  } else {
    setTimeout(initializeFreshworksWidget, 500);
  }
}

// Start the initialization process
initializeFreshworksWidget();
