<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}

$aspectBlocksPostID = $block->context["postId"] ??  "";
$aspectBlocksImage = $attributes['image'] ?? [];

$aspectBlocksImageClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksImage['class'] ?? []);
$aspectBlocksImageWrapperClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksImage['wrapperClass'] ?? []);
$aspectBlocksImageCaptionClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksImage['captionClass'] ?? []);
$aspectBlocksImageTag = $aspectBlocksImage['tag'] ?? '';
// $aspectBlocksImageLinkTo = $aspectBlocksImage['linkTo'] ?? '';
// $aspectBlocksImageLinkTarget = $aspectBlocksImage['linkTarget'] ?? '_self';
$aspectBlocksImageMetaKey = $aspectBlocksImage['metaKey'] ?? '';
$aspectBlocksImageCustomSrcUrl = $aspectBlocksImage['customImgSrcUrl'] ?? '';
$aspectBlocksImageImgSrc = $aspectBlocksImage['imgSrc'] ?? '';
$aspectBlocksImageImgSrcID = $aspectBlocksImage['imgSrcID'] ?? '';
$aspectBlocksImageImgSrcUrl = $aspectBlocksImage['imgSrcUrl'] ?? '';
$aspectBlocksImageId = $aspectBlocksImage['id'] ?? '';
$aspectBlocksImageCaptionEnable = $aspectBlocksImage['captionEnable'] ?? '';
$aspectBlocksImageCaptionSrc = $aspectBlocksImage['captionSrc'] ?? '';
$aspectBlocksImageCaptionMetaKey = $aspectBlocksImage['captionMetaKey'] ?? '';
$aspectBlocksImageCustomCaption = $aspectBlocksImage['customCaption'] ?? '';


$aspectBlocksImageSrc = '';
if ($aspectBlocksImageImgSrc === 'media' && $aspectBlocksImageImgSrcUrl) {
  $aspectBlocksImageSrc = esc_url($aspectBlocksImageImgSrcUrl);
} elseif ($aspectBlocksImageImgSrc === 'customUrl' && $aspectBlocksImageCustomSrcUrl) {
  $aspectBlocksImageSrc = esc_url($aspectBlocksImageCustomSrcUrl);
} elseif ($aspectBlocksImageImgSrc === 'customField' && $aspectBlocksImageMetaKey) {
  $metaValue = get_post_meta($aspectBlocksPostID, $aspectBlocksImageMetaKey, true);
  $aspectBlocksImageSrc =  esc_url($metaValue);
}
$aspectBlocksImageCaption = '';
if ($aspectBlocksImageCaptionEnable) {
  if ($aspectBlocksImageCaptionSrc === 'customText') {
    $aspectBlocksImageCaption = esc_attr($aspectBlocksImageCustomCaption);
  } elseif ($aspectBlocksImageCaptionSrc === 'customField' && $aspectBlocksImageCaptionMetaKey) {
    $metaValue = get_post_meta($aspectBlocksPostID, $aspectBlocksImageCaptionMetaKey, true);
    $aspectBlocksImageCaption =  esc_attr($metaValue);
  }
}
?>

<figure class="<?php echo esc_attr($aspectBlocksImageWrapperClassName); ?>"
  id="<?php echo esc_attr($aspectBlocksImageId); ?>">
  <img class="<?php echo esc_attr($aspectBlocksImageClassName); ?>" src="<?php echo esc_url($aspectBlocksImageSrc) ?>"
    alt="">

  <?php if ($aspectBlocksImageCaptionEnable) { ?>
    <figcaption class="<?php echo esc_attr($aspectBlocksImageCaptionClassName); ?>">
      <?php echo esc_attr($aspectBlocksImageCaption) ?>
    </figcaption>
  <?php } ?>




</figure>