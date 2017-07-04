module.exports = (grunt, options) => {
  const { project, helpers } = options;

  return {
    service: {
      cwd: project.res.js.devDir,
      src: `${project.res.js.service}.js`,
      dest: project.res.js.dir,
      expand: true,
    },
    build: {
      cwd: project.dir,
      src: [
        '**/*.*',
        `!${project.res.templates.dir.replace(project.dir, '')}/**`,
        `!${project.res.css.sass.replace(project.dir, '')}/**`,
        ...helpers.dontCopy,
      ],
      dest: project.build.dir,
      expand: true,
    },
    app: {
      cwd: project.build.dir,
      src: [
        '**/*.*',
        '!**/*.html',
        ...helpers.dontCopy,
      ],
      dest: project.app.dir,
      expand: true,
    },
    meta: {
      cwd: project.meta,
      src: ['**/*.*'],
      dest: project.build.dir,
      expand: true,
    },
  };
};