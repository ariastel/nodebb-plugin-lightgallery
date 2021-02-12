const cheerio = require('cheerio');

const LightGalleryPlugin = {};

LightGalleryPlugin.renderLightGallery = function (data, callback) {

  if (data.templateData.posts !== undefined) {
    data.templateData.posts = data.templateData.posts.map(post => {
      return updatePost(post);
    });
  }

  return callback(null, data);

  function updatePost(post) {

    const $ = cheerio.load('<div id="lg-post-wrapper' + post.pid + '">' + post.content + '</div>');
    const lightGalleryWrapper = $('<div id="lightgallery' + post.pid + '"></div>');

    if ($('p > img').length > 0) {
      $('#lg-post-wrapper' + post.pid).wrap(lightGalleryWrapper);
    }

    $('p > img').map((i, e) => {

      const imgsrc = $(e).attr('src');

      const anchorWrapper = $('<a></a>');
      $(anchorWrapper).attr('href', imgsrc);

      $(e).attr('data-src', imgsrc);
      $(e).attr('data-exThumbImage', imgsrc);
      $(e).wrap(anchorWrapper);
    });

    post.content = $('body').html();

    return post;
  }
}

module.exports = LightGalleryPlugin;