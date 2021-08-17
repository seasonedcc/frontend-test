import kebabCase from "lodash/kebabCase";

import type { Options } from "../types";

export default function buildFullUrl(opts: Options) {
  let url: string = opts.baseUrl || "";
  let endpoint = kebabCase(opts.name);
  let qs = null;
  if (opts.urlParser) {
    endpoint = opts.urlParser(opts.name || "");
  }
  if (opts.path) {
    endpoint = opts.path;
  }
  if (opts.id && !opts.customPath) {
    endpoint += "/";
    endpoint += opts.id;
  }
  if (opts.id && opts.customPath) {
    opts.customPath = opts.customPath.replace(/:id/, opts.id.toString());
  }
  if (opts.customPath) {
    endpoint = opts.customPath;
  }
  endpoint = endpoint.split("//").join("/");
  if (endpoint.indexOf("/") == 0) {
    let arrayEndpoint = endpoint.split("");
    arrayEndpoint.shift();
    endpoint = arrayEndpoint.join("");
  }
  if (endpoint && url.lastIndexOf("/") != url.length - 1) {
    url += "/";
  }
  url += endpoint;
  if (opts.query) {
    qs = "";
    let options = Object.keys(opts.query);
    for (let i = 0; i < options.length; i++) {
      let value = opts.query[options[i]];
      if (value == null || Number.isNaN(value) || typeof value == undefined) {
        delete opts.query[options[i]];
      }
    }
    options = Object.keys(opts.query);
    for (let i = 0; i < options.length; i++) {
      let value = opts.query[options[i]];
      let name = opts.queryStringParser
        ? opts.queryStringParser(options[i])
        : options[i];
      if (
        (typeof value == "string" ||
          typeof value == "number" ||
          typeof value == "boolean") &&
        !Number.isNaN(value)
      ) {
        qs += name + "=" + value;
      } else {
        value = value as Array<any>;
        for (let u = 0; u < value.length; u++) {
          qs += name + "[]=" + value[u];
          if (u < value.length - 1) qs += "&";
        }
      }
      if (i < options.length - 1) qs += "&";
    }
  }
  if (url.lastIndexOf("/") == url.length - 1) {
    let arrayUrl = url.split("");
    arrayUrl.pop();
    url = arrayUrl.join("");
  }
  if (qs != null) {
    url += "?" + qs;
  }
  return url;
}
