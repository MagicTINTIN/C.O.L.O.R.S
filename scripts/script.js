function copytcb(tocopy) {
    const storage = document.createElement('textarea');
    try {
        storage.value = tocopy;
        document.body.appendChild(storage);

        storage.select();
        storage.setSelectionRange(0, 99999);
        document.execCommand('copy');

        console.log('Color copied to clipboard', 2);
        return 0;

    } catch (err) {
        console.log('Failed to copy: ', err, 2);
        return 1;
    }
    finally {
        document.body.removeChild(storage);
    }
}


function copied(object) {
    object.classList.add('copied');
    setTimeout(() => {
        object.classList.remove('copied');
    }, 2000);
}