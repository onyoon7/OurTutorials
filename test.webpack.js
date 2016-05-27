const context = require.context('./app', true, /-test\.jsx?$/);
context.keys().forEach(context);
