/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
;
(function ($, document, ns) {
    "use strict";

    var PROMOTE_ACTIVATOR = "." + ns.LaunchesAdmin.NAMESPACE + "-promote-activator";
    var PROMOTE_CMD = "promoteLaunch";

    $(document).on("click", PROMOTE_ACTIVATOR, function(e) {
        var selection = $(".foundation-collection").first().find(".foundation-selections-item").first();
        var path = selection.data("foundationCollectionItemId") || selection.data("path");

        var promise = $.post(ns.LaunchesAdmin.WCM_COMMAND_URL, {
            "_charset_": "UTF-8",
            ":status" : "browser",
            cmd: PROMOTE_CMD,
            includeSubPages: true,
            path: path,
            promotionScope: "full"
        });

        promise.done(function () {
            var notificationSlider = new ns.UI.NotificationSlider($(".endor-Page-content.endor-Panel.foundation-content"));
            notificationSlider.notify({
                content: ns.I18n.get("Launch promoted"),
                type: "info",
                closable: false,
                className: "notification-alert--absolute admin-notification"
            });
        }).fail(function (jqXHR) {
            var errorMsg = ns.I18n.getVar($(jqXHR.responseText).find("#Message").html());
            var notificationSlider = new ns.UI.NotificationSlider($(".endor-Page-content.endor-Panel.foundation-content"));
            notificationSlider.notify({
                content: errorMsg,
                closable: false,
                className: "notification-alert--absolute admin-notification"
            });
        });
    });

})(Granite.$, document, Granite);
