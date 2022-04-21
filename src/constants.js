function getPreviewWidth() {
  const screen_width = document.documentElement.clientWidth;

  if (screen_width >= 768) {
    return 320;
  }

  if (screen_width >= 480) {
    return 440;
  }

  return screen_width;
}

export default {
  PER_PAGE: 12,
  TOTAL_PAGES: 59,
  CLIENT_ID: 'ILGI1sL6MU_RwCf-oWrdfk0duatvi9ofvhKretKdX7U',
  PREVIEW_W: getPreviewWidth(),
};
