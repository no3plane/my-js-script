for (const font of await window.queryLocalFonts()) {
    console.log(font.family + ' -> ' + font.fullName);
}