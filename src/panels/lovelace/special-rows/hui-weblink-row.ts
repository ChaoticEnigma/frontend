import {
  css,
  CSSResult,
  customElement,
  html,
  internalProperty,
  LitElement,
  TemplateResult,
} from "lit-element";
import "../../../components/ha-icon";
import { HomeAssistant } from "../../../types";
import { LovelaceRow, WeblinkConfig } from "../entity-rows/types";

@customElement("hui-weblink-row")
class HuiWeblinkRow extends LitElement implements LovelaceRow {
  public hass?: HomeAssistant;

  @internalProperty() private _config?: WeblinkConfig;

  public setConfig(config: WeblinkConfig): void {
    if (!config || !config.url) {
      throw new Error("URL required");
    }

    this._config = {
      icon: "hass:link",
      name: config.url,
      ...config,
    };
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }

    return html`
      <a
        href=${this._config.url}
        target=${this._config.url.indexOf("://") !== -1 ? "_blank" : ""}
        rel="noreferrer"
      >
        <ha-icon .icon="${this._config.icon}"></ha-icon>
        <div>${this._config.name}</div>
      </a>
    `;
  }

  static get styles(): CSSResult {
    return css`
      a {
        display: flex;
        align-items: center;
        color: var(--primary-color);
      }
      ha-icon {
        padding: 8px;
        color: var(--paper-item-icon-color);
      }
      div {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 16px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-weblink-row": HuiWeblinkRow;
  }
}
