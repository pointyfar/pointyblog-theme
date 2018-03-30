import {MDCRipple} from '@material/ripple';
import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar';



const toolbar = new MDCToolbar(document.querySelector('.mdc-toolbar'));



toolbar.listen('MDCToolbar:change', function(evt) {
var flexibleExpansionRatio = evt.detail.flexibleExpansionRatio;

});
      








