import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {
  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      secondaryCreator: { type: String },
      alt: { type: String },
    };
  }

  static get styles() {
    return css`
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        margin: 16px;
        transition: background-color 0.3s;
      }

      .card:hover {
        background-color: #f0f0f0;
      }

      .image {
        width: 240px;
        height: auto;
      }

      .content {
        padding: 8px;
      }

      .content div {
        font-size: 16px;
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <a href="${this.source}" target="_blank" tabindex="0">
        <div class="card">
          <img class="image" src="${this.source}" alt="${this.alt}" />
          <div class="content">
            <div>${this.title}</div>
            <div>By: ${this.secondaryCreator}</div>
          </div>
        </div>
      </a>
    `;
  }

  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);