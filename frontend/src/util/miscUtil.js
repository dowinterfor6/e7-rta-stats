export const MULTI_SELECT = "MULTISELECT";
export const SINGLE_DATA = "SINGLEDATA";
export const OBJ_MULTI_SELECT = "OBJMULTISELECT";

export const BAR_CHART = "BAR";
export const PIE_CHART = "PIE";
export const TREEMAP_CHART = "TREEMAP";

export const checkDataType = (data) => {
  if (!Array.isArray(data)) {
    return OBJ_MULTI_SELECT;
  }
  return data[0].league || data[0].server ? MULTI_SELECT : SINGLE_DATA;
};

export const formatServerName = (server) => {
  const removePrefix = server.replace("world_", "");
  const fullName = removePrefix.replace("eu", "europe").replace("kor", "korea");
  return `${fullName[0].toUpperCase()}${fullName.slice(1)}`;
};
