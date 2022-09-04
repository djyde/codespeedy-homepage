const { default: axios } = require("axios");

module.exports = async function () {
  const release = await axios.get(
    "https://tauri-updater.deno.dev/djyde/codespeedy/latest",
    {
      headers: {},
    }
  );

  const assetForMac = release.data.assets.find((a) =>
    a.name.includes(".app.tar.gz")
  );
  const assetForWindows = release.data.assets.find((a) =>
    a.name.includes(".msi.zip")
  );

  console.log(release.data)

  const downloads = {
    windows: assetForWindows
      ? {
          downloadLink: `https://tauri-updater.deno.dev/download-asset?${new URLSearchParams(
            {
              asset: assetForWindows.url,
              filename: assetForWindows.name,
            }
          )}`,
          version: release.data.tag_name,
          size: `${Math.round(assetForWindows.size / 1024 / 1024)} MB`,
        }
      : undefined,
    mac: {
      downloadLink: `https://tauri-updater.deno.dev/download-asset?${new URLSearchParams(
        {
          asset: assetForMac.url,
          filename: assetForMac.name,
        }
      )}`,
      version: release.data.tag_name,
      size: `${Math.round(assetForMac.size / 1024 / 1024)} MB`,
    },
  };

  return {
    mac: downloads.mac,
    windows: downloads.windows,
  };
};
