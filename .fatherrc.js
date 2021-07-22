export default {
    entry: 'src/index.tsx',
    esm:'babel',
    cjs:'babel',
    umd:{
        name:'index',
        minFile:false
    },
    extractCSS:true,
    runtimeHelpers:true
}
