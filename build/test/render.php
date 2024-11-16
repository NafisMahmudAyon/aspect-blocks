<?php
// Ensure $attributes is defined before using it
if (!isset($attributes)) {
    $attributes = []; // or fetch/populate $attributes as needed
}
?>

<div class="tailwind-update-me1">
  <pre style="display: none;"><?php echo wp_json_encode($attributes); ?></pre>
</div>

<?php
// Register and enqueue Tailwind CSS script

// Debugging output for $attributes
var_dump($attributes);
?>