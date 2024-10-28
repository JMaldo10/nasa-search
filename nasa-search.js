/**
 * Copyright 2024 Jeremy Maldonado
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from 'lit';

class NasaImage extends LitElement {
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

class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
        padding: 8px;
        margin: 16px 0;
      }
      .results {
        display: flex;
        flex-wrap: wrap;
      }
    `;
  }

  constructor() {
    super();
    this.value = '';
    this.title = 'NASA Image Search';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
      <div class="results">
        ${this.items.map((item) => html`
          <nasa-image
            source="${item.links[0].href}"
            title="${item.data[0].title}"
            alt="${item.data[0].description || 'Image from NASA'}"
            secondaryCreator="${item.data[0].secondary_creator || 'Unknown'}"
          ></nasa-image>
        `)}
      </div>
    `;
  }

  inputChanged(e) {
    this.value = e.target.value;
  }

  updated(changedProperties) {
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    } else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`)
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (data.collection) {
          this.items = data.collection.items;
        }
        this.loading = false;
      });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);