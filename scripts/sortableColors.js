$(document).ready(function (e) {
    $(".sortable").sortable({
        items: ':not(.static)',
        connectWith: ".sortable",
        stop: function (event, ui) {
            getOrder();
        }
    });
    $(".sortable").disableSelection();
});

function getOrder() {
    const colorsDivs = document.getElementById("colors");
    newColors = [];
    for (const colorDiv of colorsDivs.children) {
        if (colorDiv.id.toUpperCase().startsWith("COLOR")) {
            let idname = colorDiv.id.toUpperCase().split("COLOR").join("");
            let locked = false;
            if (idname.toUpperCase().endsWith("L")) {
                idname = idname.slice(0, -1);
                locked = true;
            }
            newColors = [...newColors, { isLocked: locked, hex: idname }];
        }
    }

    window.pageColors = newColors;
    window.numberOfColors = window.pageColors.length;
    saveColorsToHistory();
    updateColors();
}

/*
 * Content-Type:text/javascript
 *
 * A bridge between iPad and iPhone touch events and jquery draggable, 
 * sortable etc. mouse interactions.
 * @author Oleg Slobodskoi  
 * 
 * modified by John Hardy to use with any touch device
 * fixed breakage caused by jquery.ui so that mouseHandled internal flag is reset 
 * before each touchStart event
 * 
 */
(function( $ ) {

    $.support.touch = typeof Touch === 'object';

    if (!$.support.touch) {
        return;
    }

    var proto =  $.ui.mouse.prototype,
    _mouseInit = proto._mouseInit;

    $.extend( proto, {
        _mouseInit: function() {
            this.element
            .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
            _mouseInit.apply( this, arguments );
        },

        _touchStart: function( event ) {
            if ( event.originalEvent.targetTouches.length != 1 ) {
                return false;
            }

            this.element
            .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
            .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

            this._modifyEvent( event );

            $( document ).trigger($.Event("mouseup")); //reset mouseHandled flag in ui.mouse
            this._mouseDown( event );

            return false;           
        },

        _touchMove: function( event ) {
            this._modifyEvent( event );
            this._mouseMove( event );   
        },

        _touchEnd: function( event ) {
            this.element
            .unbind( "touchmove." + this.widgetName )
            .unbind( "touchend." + this.widgetName );
            this._mouseUp( event ); 
        },

        _modifyEvent: function( event ) {
            event.which = 1;
            var target = event.originalEvent.targetTouches[0];
            event.pageX = target.clientX;
            event.pageY = target.clientY;
        }

    });

})( jQuery );

function implementSortable() {
    $("#colors").sortable();
    $("#colors").disableSelection();
 }