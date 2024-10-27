/**
 * Copyright 2024 Jeremy Maldonado
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from 'lit';
import "./nasa-image.js";

export class NasaSearch extends LitElement {
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
      /* Add your styles here */
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