const { default: axios } = require("axios");

module.exports = async function () {
  const release = await axios.get(
    "https://tauri-updater.deno.dev/djyde/codespeedy/latest",
    {
      headers: {},
    }
  );

  const asset = release.data.assets.find((a) => a.name.includes(".app.tar.gz"));

  const downloadLink = `https://tauri-updater.deno.dev/download-asset?${new URLSearchParams(
    {
      asset: asset.url,
      filename: asset.name,
    }
  )}`;

  return {
    downloadLink,
    version: release.data.tag_name,
    size: `${Math.round(asset.size / 1024 / 1024)} MB`,
  };
};
