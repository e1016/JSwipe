document.addEventListener('DOMContentLoaded', function() {

	var Drawer = {
		init: function() {
			this.cacheDOM();
			this.bindListener();
			this.draggAvalible = false;
		},
		draggingMenu: function(e) {
			this.posX = e.touches[0].clientX
			if (this.draggAvalible && this.posX < 300 && this.draggAvalible) {
				this.$drawer.style.left = (-300 + this.posX) + 'px';
				this.$modal.style.opacity = (this.posX / 200);
			}
		},
		startDraggingMenu: function(e) {
			if ( e.touches[0].clientX < 20 && !this.$drawer.classList.contains('actived') ) {
				this.draggAvalible = true;
				this.$modal.style.display = 'block';
			} else if ( e.touches[0].clientX > 280 && this.$drawer.classList.contains('actived') ) {
				this.draggAvalible = true;
			}
		},
		disableDraggingMenu: function() {
			this.$drawer.style.transition = '0.2s ease';
			this.$modal.style.transition = '0.2s ease';
			if ( this.posX > 100 && this.draggAvalible && !this.$drawer.classList.contains('actived') ) {
				this.$drawer.classList.add('actived');
				this.$drawer.style.left = '0px';
				this.draggAvalible = false;
			} else if ( this.posX <= 100 && this.draggAvalible && !this.$drawer.classList.contains('actived') ) {
				this.$drawer.classList.remove('actived');
				this.$drawer.style.left = '-300px';
				this.$modal.style.opacity = '0';
				this.draggAvalible = false;
				setTimeout(function() {
					Drawer.$modal.style.display = 'none';	
				}, 200);
			} else if ( this.posX < 290 && this.draggAvalible && this.$drawer.classList.contains('actived')) {
				this.$drawer.classList.remove('actived');
				this.$drawer.style.left = '-300px';
				this.$modal.style.opacity = '0';
				this.draggAvalible = false;
				setTimeout(function() {
					Drawer.$modal.style.display = 'none';	
				}, 200);
			} else if ( this.posX >= 290 && this.draggAvalible && this.$drawer.classList.contains('actived')) {
				this.$drawer.classList.add('actived');
				this.$drawer.style.left = '0px';
				this.draggAvalible = false;
			}

			setTimeout(function() {
				Drawer.$drawer.style.transition = 'none';
				Drawer.$modal.style.transition = 'none';
			}, 200);
		},
		controlDrawer: function() {
			this.$drawer.style.transition = '0.2s ease';
			this.$modal.style.transition = '0.2s ease';
			if ( this.$drawer.classList.contains('actived')) {
				this.$drawer.classList.remove('actived')
				this.$drawer.style.left = '-300px';
				this.$modal.style.opacity = '0';
				setTimeout(function() {
					Drawer.$modal.style.display = 'none';
					Drawer.$modal.style.transition = 'none';
				}, 200);
			} else {
				this.$drawer.classList.add('actived')
				this.$drawer.style.left = '0px';
				this.$modal.style.display = 'block';
				this.$modal.style.opacity = '1';
			}

			setTimeout(function() {
				Drawer.$drawer.style.transition = 'none';
				Drawer.$modal.style.transition = 'none';
			}, 200);
		},
		bindListener: function() {
			window.addEventListener('touchstart', this.startDraggingMenu.bind(this));
			window.addEventListener('touchend', this.disableDraggingMenu.bind(this));
			window.addEventListener('touchmove', this.draggingMenu.bind(this));
			try {
				this.$trigger.addEventListener('click', this.controlDrawer.bind(this));
			} catch (err) { console.log(err) }
		},
		cacheDOM: function() {
			this.$drawer = document.getElementById('drawer_js');
			this.$modal = document.querySelector('.__modal_drawer');
			try {
				this.$trigger = document.getElementById('drawer_trgger');
			} catch (err) { console.log(err) }
		}
	};

	Drawer.init();

});