const babelCfg = {
  cacheDirectory: false,
  cacheCompression: false,
  'presets': [
    [
      '@babel/preset-env',
      {
        'modules': false,
        'loose': true,
        // useBuiltIns: "usage",
        // corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript', // ts
  ],
  'plugins': [
    ['import', {
      'libraryName': 'antd',
      'style': 'css',
    }, 'antd'],
    ['import', {
      'libraryName': '@mlz/doraemon',
      'camel2DashComponentName': false,
    }, 'doraemon'],
    ['module-resolver', {
      'extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.scss'],
      // 'alias': alias,
    }],
    // ['react-css-modules', {
    //   'generateScopedName': config.cssScopeName,
    //   webpackHotModuleReloading: true,
    //   handleMissingStyleName: 'warn',
    //   'filetypes': {
    //     '.scss': {
    //       'syntax': 'postcss-scss',
    //       'plugins': [
    //         [
    //           'postcss-import-sync2',
    //           {
    //             resolve: function(id, basedir) {
    //               const nextId = id;
    //               const keys = Object.keys(alias);
    //               const key = id.split('/')[0];
    //               if (keys.find((item) => item === key)) {
    //                 return path.resolve(alias[key], id.replace(key, '.'));
    //               }
    //               return path.resolve(basedir, nextId);
    //             },
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // }],
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': false,
        'helpers': true,
        'regenerator': true,
        'useESModules': false,
      },
    ],
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'const-enum',
  ],
};

module.exports = babelCfg;