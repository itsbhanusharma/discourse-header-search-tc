import { withPluginApi } from "discourse/lib/plugin-api";
import hbs from "discourse/widgets/hbs-compiler";

export default {
  name: "customize-widget",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      api.reopenWidget("header-contents", {
        template: hbs`
        {{#if this.site.desktopView}}
          {{#if attrs.sidebarEnabled}}
            {{sidebar-toggle attrs=attrs}}
          {{/if}}
        {{/if}}
        {{home-logo attrs=attrs}}
        {{#if attrs.topic}}
          {{header-topic-info attrs=attrs}}
        {{else}}
          {{#unless this.site.mobileView}}
            {{#if this.site.siteSettings.login_required}}
              {{#if this.currentUser}}
                {{floating-search-input attrs=attrs}}
              {{/if}}
            {{else}}
              {{floating-search-input attrs=attrs}}
            {{/if}}   
          {{/unless}}
        {{/if}}
        <div class="panel clearfix">{{yield}}</div>
      `,
      });
    });
  },
};
