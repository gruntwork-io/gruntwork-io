(function($) {
  // Instantiate an Optimizely client
  const options = {
    sdkKey: '8E1RuW2VLAS2csau84LZRq',
    datafileOptions: {
      autoUpdate: true,
      updateInterval: 6000, // 1 minute in milliseconds
    }
  };
  const optimizelyClientInstance = window.optimizelySdk.createInstance(options);

  optimizelyClientInstance.onReady().then(() => {
    // optimizelyClientInstance is ready to use, with datafile downloaded from the Optimizely CDN

    const optimizelyEndUserIdCookieKey = 'optimizelyEndUserId';
    if (!getCookiebyName(optimizelyEndUserIdCookieKey)) {
      // Create optimizely UserID
      setCookie(optimizelyEndUserIdCookieKey, generateUUID(), 365);
    }
    const userId = getCookiebyName(optimizelyEndUserIdCookieKey);

    /**
     * Experiment: Navbar vs Checkout Flow
     * Description: This experiment seeks to test out the variations of navbar and checkout flows
     * to track the following in each variation:
     * How many users;
     *
     * - End up on the checkout page - done
     * - Click the checkout button - done
     * - End up on the contact page - done
     * - Contact us after reaching the contact page - done
     * - Click on the other buttons in the Nav - done
     * - Pick the add ons per cloud provider - done
     * - Click the learn more vs Get Demo - done
     * - Click ask a grunt vs contact sales
     */
    (function () {
      var variation = optimizelyClientInstance.activate('navbar_and_checkout_flow', userId);
      if (variation === 'original_nav_plus_original_checkout_flow') {
        // Pick the desired hidden elements to show for this variation
        $('#navbar-original').show();
        $('#learn-more').show();
      } else if (variation === 'original_nav_plus_beta_checkout_flow') {
        // execute code for original_nav_plus_beta_checkout_flow
      } else if (variation === 'beta_nav_plus_beta_checkout_flow') {
        // execute code for beta_nav_plus_beta_checkout_flow
      } else if (variation === 'beta_nav_plus_original_checkout_flow') {
        // execute code for beta_nav_plus_original_checkout_flow
      } else {
        // execute default code
      }


      // Metrics to track
      $('.checkout-link').click(function () {
        optimizelyClientInstance.track('user_on_checkout_page', userId);
      });
      $('.btn-checkout').click(function () {
        optimizelyClientInstance.track('user_clicked_checkout_button', userId);
      });
      $('.contact-cta, .product-ctas, .service-ctas').click(function () {
        optimizelyClientInstance.track('user_on_contact_page', userId);
      });
      $('#submit-button').click(function () {
        optimizelyClientInstance.track('user_contacted_sales', userId);
      })
      $('.nav-item-central').click(function () {
        optimizelyClientInstance.track('user_clicked_on_other_navbar_buttons', userId);
      });
      $('.home-page-cta').click(function () {
        optimizelyClientInstance.track('user_clicked_home_page_main_cta', userId);
      });
      $('.support-addon').click(function () {
        optimizelyClientInstance.track('user_added_support', userId);
      });
      $('.setup-addon').click(function () {
        optimizelyClientInstance.track('user_added_refarch', userId);
      });
    })();
  });
})(window.jQuery);
