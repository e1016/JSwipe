
function share () {

}

console.log( typeof share === 'function' )

let Drawer = {
	init ( bundle ) {
		this.cacheDOM();
		this.bindListener();
		this.draggAvalible = false;
		if ( bundle ) {
			let type = typeof bundle
			console.log( type === 'object' )
			if ( type === 'object' ) {
				this.renderPrepare( bundle.main );
				this.renderHeader( bundle.main );
				this.renderOptions( bundle.menu );
			} else {
				console.log('%c Unexpected type of parameter, it was expected a JSON bundle', 'background: orange; color: white; font-size: 15px; font-family: Roboto Mono;');
			}
		}
	},
	setTriggerStatus () {
		try {
			this.$trigger.classList.toggle('drawer_actived');
		} catch (err) {}
	},
	draggingMenu (e) {
		this.posX = e.touches[0].clientX
		if ( this.draggAvalible && this.posX < 300 && this.draggAvalible ) {
			this.$drawer.style.transform = `translateX(${(-300 + this.posX) + 'px'})`;
			this.$modal.style.opacity = (this.posX / 200);
		}
	},
	startDraggingMenu (e) {
		if ( e.touches[0].clientX < 20 && !this.$drawer.classList.contains('actived') ) {
			this.draggAvalible = true;
			this.$modal.style.display = 'block';
		} else if ( e.touches[0].clientX > 280 && this.$drawer.classList.contains('actived') ) {
			this.draggAvalible = true;
		}
	},
	disableDraggingMenu () {
		this.$drawer.style.transition = '0.2s ease';
		this.$modal.style.transition = '0.2s ease';
		if ( this.posX > 100 && this.draggAvalible && !this.$drawer.classList.contains('actived') ) {
			this.$drawer.classList.add('actived');
			this.$drawer.style.transform = 'translateX(0px)';
			this.draggAvalible = false;
		} else if ( this.posX <= 100 && this.draggAvalible && !this.$drawer.classList.contains('actived') ) {
			this.$drawer.classList.remove('actived');
			this.$drawer.style.transform = 'translateX(-300px)';
			this.$modal.style.opacity = '0';
			this.draggAvalible = false;
			setTimeout(() => {
				this.$modal.style.display = 'none';
			}, 200);
		} else if ( this.posX < 290 && this.draggAvalible && this.$drawer.classList.contains('actived')) {
			this.$drawer.classList.remove('actived');
			this.$drawer.style.transform = 'translateX(-300px)';
			this.$modal.style.opacity = '0';
			this.draggAvalible = false;
			setTimeout(() => {
				this.$modal.style.display = 'none';
			}, 200);
		} else if ( this.posX >= 290 && this.draggAvalible && this.$drawer.classList.contains('actived')) {
			this.$drawer.classList.add('actived');
			this.$drawer.style.transform = 'translateX(0px)';
			this.draggAvalible = false;
		}

		this.setTriggerStatus();

		setTimeout(() => {
			this.$drawer.style.transition = 'none';
			this.$modal.style.transition = 'none';
		}, 200);
	},
	controlDrawer () {
		this.$drawer.style.transition = '0.2s ease';
		this.$modal.style.transition = '0.2s ease';
		if ( this.$drawer.classList.contains('actived')) {
			this.$drawer.classList.remove('actived')
			this.$drawer.style.transform = 'translateX(-300px)';
			this.$modal.style.opacity = '0';
			setTimeout(() => {
				this.$modal.style.display = 'none';
				this.$modal.style.transition = 'none';
			}, 200);
		} else {
			this.$drawer.classList.add('actived')
			this.$drawer.style.transform = 'translateX(0px)';
			this.$modal.style.display = 'block';
			this.$modal.style.opacity = '1';
		}

		this.setTriggerStatus();

		setTimeout(() => {
			this.$drawer.style.transition = 'none';
			this.$modal.style.transition = 'none';
		}, 200);
	},
	renderPrepare() {
		this.$drawer.innerHTML = `
			<div class="__header"></div>
			<div class="__menu"></div>
		`;
		this.$_header = this.$drawer.querySelector('.__header');
		this.$_menu = this.$drawer.querySelector('.__menu');
	},
	renderHeader( bundle ) {
		this.$_header.setAttribute('style', `background-image: url('${ bundle.background }')`)
		this.$_header.innerHTML = `
			<span class="__user_photo" style="background-image: url('${ bundle.photo }')"></span>
			<span class="__main_title">${ bundle.title }</span>
			<span class="__sub_title">${ bundle.subtitle }</span>
		`;
	},
	renderOptions( bundle ) {

		console.log( bundle )

		this.$_menu.innerHTML = '<ul>';

		bundle.forEach( item => {
			let itemTemporal
			if ( item.separator ) {
				itemTemporal = `<hr> <p>${ item.separator }</p>`;
			} else {
				itemTemporal = '<li>';

				if ( item.icon ) { }
				if ( item.label ) { }
				if ( item.action ) {
					console.log( typeof item.action )
					if ( typeof item.action === 'string' ) {

					}
				}

				itemTemporal += '</li>';
			}
		})

		this.$_menu.innerHTML += '</ul>';
	},
	bindListener() {
		window.addEventListener('touchstart', this.startDraggingMenu.bind(this));
		window.addEventListener('touchend', this.disableDraggingMenu.bind(this));
		window.addEventListener('touchmove', this.draggingMenu.bind(this));
		try {
			this.$trigger.addEventListener('click', this.controlDrawer.bind(this));
		} catch (err){}
	},
	cacheDOM() {
		this.$drawer = document.getElementById('drawer_js');
		this.$modal = document.querySelector('.__modal_drawer');
		try {
			this.$trigger = document.getElementById('drawer_trgger');
		} catch (err){}
	}
};

const param = 'jeje que once'

document.addEventListener('DOMContentLoaded', function() {
	Drawer.init({
		main: {
			background: 'http://images6.fanpop.com/image/photos/40500000/How-I-met-your-Mother-the-00s-40533608-1920-1080.jpg',
			photo: 'http://articlebio.com/uploads/bio/2016/09/16/cobie-smulders.jpg',
			title: 'Cobi Smulders',
			subtitle: 'exam@mail.com',
		},
		menu: [{
			icon: 'account_circle',
			label: 'Mi perfil',
			action: '/profile'
		},{
			icon: 'favorite',
			label: 'Favoritos',
			action: '/profile'
		},{
			icon: 'share',
			label: 'Compartir',
			action: share
		},{
			separator: 'setings'
		},{
			icon: 'settings_applications',
			label: 'ajustes',
			action: '/profile'
		}],
	})
});
