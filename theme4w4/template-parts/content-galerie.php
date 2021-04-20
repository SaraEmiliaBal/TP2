<?php
/**
 * Template part l'affichage des bloc de cours dans front-page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package theme4w4
 */

?>

<article>
	<a href="<?php echo get_permalink() ?>"><?php the_post_thumbnail( 'thumbnail' ); ?></a>
	<div class="galerie_info">
		<?php the_title(); ?>
	</div>
</article> 
