<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
  $attributes = []; // or fetch/populate $attributes as needed
}

$aspectBlocksPostID = $block->context["postId"] ??  "";
$aspectBlocksPostUrl = get_the_permalink($aspectBlocksPostID);
$aspectBlocksThePost = get_post($aspectBlocksPostID);
$post_title = $aspectBlocksThePost->{"post_title"} ?? "Post Has No Title";

$aspectBlocksTitle = $attributes['title'] ?? [];
$aspectBlocksClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksTitle['class'] ?? []);
$aspectBlocksLinkClassName = aspectBlocks_auto_concatenate_classes($aspectBlocksTitle['linkClass'] ?? []);
$aspectBlocksTitleTag = $aspectBlocksTitle['tag'] ?? '';
$aspectBlocksTitleLinkTo = $aspectBlocksTitle['linkTo'] ?? '';
$aspectBlocksTitleLinkTarget = $aspectBlocksTitle['linkTarget'] ?? '_self';
$aspectBlocksTitleLinkMetaKey = $aspectBlocksTitle['metaKey'] ?? '';
$aspectBlocksTitleCustomUrl = $aspectBlocksTitle['customUrl'] ?? '#';
$aspectBlocksTitleId = $aspectBlocksTitle['id'] ?? '';
$aspectBlocksTitleContent = $aspectBlocksTitle['content'] ?? '';

$aspectBlocksTitleLinkToURL = "#";
if ($aspectBlocksTitleLinkTo === 'customUrl') {
  $aspectBlocksTitleLinkToURL = $aspectBlocksTitleCustomUrl;
} elseif ($aspectBlocksTitleLinkTo === 'postUrl') {
  $aspectBlocksTitleLinkToURL = $aspectBlocksPostUrl;
} elseif ($aspectBlocksTitleLinkTo === 'homeUrl') {
  $aspectBlocksTitleLinkToURL = home_url();
} elseif ($aspectBlocksTitleLinkTo === 'customField') {
  $metaUrl =
    get_post_meta($aspectBlocksPostID, $aspectBlocksTitleLinkMetaKey, true);
  $aspectBlocksTitleLinkToURL = filter_var($metaUrl, FILTER_VALIDATE_URL) ? $metaUrl : $aspectBlocksPostUrl;
} else {
  $aspectBlocksTitleLinkToURL = $aspectBlocksPostUrl;
}
?>

<<?php echo esc_html($aspectBlocksTitleTag); ?> class="<?php echo esc_attr($aspectBlocksClassName); ?>"
  id="<?php echo esc_attr($aspectBlocksTitleId); ?>">
  <?php if ($aspectBlocksTitleLinkTo) : ?>
    <a href="<?php echo esc_url($aspectBlocksTitleLinkToURL); ?>"
      target="<?php echo esc_attr($aspectBlocksTitleLinkTarget); ?>"
      class="<?php echo esc_attr($aspectBlocksLinkClassName); ?>">
      <?php echo wp_kses_post($post_title); ?>
    </a>
  <?php else : ?>
    <?php echo wp_kses_post($post_title) ?>
  <?php endif; ?>
</<?php echo esc_html($aspectBlocksTitleTag); ?>>