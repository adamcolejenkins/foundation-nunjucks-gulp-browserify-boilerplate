'use strict';

import config         from '../config';
import gulp           from 'gulp';
import handlebars     from 'gulp-compile-handlebars';
import inject         from 'gulp-inject';
import handleErrors   from '../util/handleErrors';
import browserSync    from 'browser-sync';

gulp.task( 'views', function () {
  
  const templateData = {
    title:        config.site.title,
    description:  config.site.description,
    keywords:     config.site.keywords
  };
  
  return gulp.src( config.views.src )
    
    // Compile handlebar templates
    .pipe( handlebars( templateData, config.handlebars ) )
    
    // Display any errors
    .on( 'error', handleErrors )
    
    // Write to destination
    .pipe( gulp.dest( config.views.dest ) )
    
    // Inject source files
    .pipe( inject( gulp.src( [config.styles.dest + '/*.css', config.scripts.dest + '/*.js'], { read: false } ), { relative: true }))
    
    // Write to destination
    .pipe( gulp.dest( config.views.dest ) )
    
    // Refresh browser stream
    .pipe(browserSync.stream({ once: true }));
  
});