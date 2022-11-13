
$(function () {
    $("#button").dxButton({
        text: "Click me!",
        onClick() {
            api.ipcRenderer.send('rendertomain', 'Render process');

            window.api.func1((event, args) => {
                console.log(args);

            })
        }
    });

});

