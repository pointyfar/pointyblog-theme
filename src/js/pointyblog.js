import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar';
import {MDCTemporaryDrawer} from '@material/drawer';
import {MDCDialog} from '@material/dialog';

const toolbar = new MDCToolbar(document.querySelector('.mdc-toolbar'));
const dialog = new MDCDialog(document.querySelector('#px-photo-dialog'));
const pxtabs = document.querySelector('.px-tabs')


toolbar.listen('MDCToolbar:change', function(evt) {
  var flexibleExpansionRatio = evt.detail.flexibleExpansionRatio;

});
      

const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
document.querySelector('.menu').addEventListener('click', () => drawer.open = true);


dialog.listen('MDCDialog:accept', function() {
  console.log('accepted');
})

dialog.listen('MDCDialog:cancel', function() {
  console.log('canceled');
})

window['imageDialog'] = function(img) {
  var dialogImg = document.getElementById('dialog-img');
  document.querySelector('#px-dialog-img-container').setAttribute("style",`background:url('${img}') no-repeat center; background-size: contain`);
  dialog.show();
}
