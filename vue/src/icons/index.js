import Vue from "vue";
import SvuIcon from "./SvgIcons";
Vue.component("svg-icon", SvuIcon);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  // console.log(requireContext.keys());
  return requireContext.keys().map(requireContext);
};
requireAll(req);
