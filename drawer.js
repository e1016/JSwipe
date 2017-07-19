document.addEventListener('DOMContentLoaded', function() {

	var Drawer = {
		init: function() {
			this.cacheDOM();
			this.bindListener();

			// initializing drag denegated permissions
			this.draggAvalible = false;
		},
		draggingMenu: function(e) {
			this.posX = e.touches[0].clientX
			if (this.draggAvalible && this.posX < 300) {
				this.$drawer.style.left = (-300 + this.posX) + 'px';
			}
		},
		startDraggingMenu: function(e) {
			//  this.$drawer.classList.contains('actived')
			if ( e.touches[0].clientX < 50 && !this.$drawer.classList.contains('actived')) {
				this.draggAvalible = true;
			}
		},
		disableDraggingMenu: function() {
			this.draggAvalible = false;
			this.$drawer.style.transition = '0.2s ease';
			if (this.posX > 100) {
				this.$drawer.classList.add('actived');
				this.$drawer.style.left = '0px';
			} else {
				this.$drawer.style.left = '-300px';
			}
			setTimeout(function() {
				Drawer.$drawer.style.transition = 'none';
			}, 200);
		},
		bindListener: function() {
			window.addEventListener('touchstart', this.startDraggingMenu.bind(this));
			window.addEventListener('touchend', this.disableDraggingMenu.bind(this));
			window.addEventListener('touchmove', this.draggingMenu.bind(this));
		},
		cacheDOM: function() {
			this.$drawer = document.getElementById('drawer_js');
		}
	};

	Drawer.init();

});