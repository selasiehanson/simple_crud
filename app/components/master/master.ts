/// <reference path="../../../typings/tsd.d.ts" />

//import { AuthEvents } from '../components/shared/auth_events';
// import { AuthToken }  from '../components/shared/auth_token';

import { RouteFinder } from '../shared/route-finder';
import { AuthEvents } from '../shared/auth-events';
import { AuthToken } from '../shared/auth-token';

let http : angular.IHttpService;
let client = Object;
let routeFinder: RouteFinder;
let rootScope: angular.IRootScopeService;
let authToken: AuthToken;

interface INav {
	name: string;
	icon: string;
	route: string;
}

class MasterCtrl {

	state: ng.ui.IStateService;
	
	navs: Array<INav>;
	loggedIn: boolean;
	currentRouteName: string;
	
	
	constructor(_http:angular.IHttpService, _rootScope: angular.IRootScopeService, _state: angular.ui.IStateService , _RouteFinder: RouteFinder, _authToken: AuthToken) {
		http = _http;
		this.state = _state;
		routeFinder = _RouteFinder;
		authToken = _authToken;

		this.navs = [
			{
				name: 'home',
				icon: 'md-home',
				route: '/app/dashboard'
			},
			{
				name: 'clients',
				icon: 'md-people',
				route: "/app/clients"
			},
			{
				name: 'sales',
				icon: 'md-attach-money',
				route: "/app/sales"
			},
			{
				name: 'products',
				icon: 'md-add-shopping-cart',
				route: "/app/products"
			}, {
				name: 'companies',
				icon: 'md-contacts',
				route: "/app/companies"
			},
			{
				name: 'reports',
				icon: 'md-trending-up',
				route: "/app/reports"
			}
		];

		rootScope = _rootScope;

		for (let nav of this.navs) {
			routeFinder.put(nav.route, nav.name);
			routeFinder.put(`${nav.route}/new`, nav.name);
			//todo: add the route for edit on the resource as well
			//soln: use substring or string.contains to determine if a the current route is a child route
		}

		this.loggedIn = true;
		rootScope.$on(AuthEvents.loginSuccess, (ev, args) => {
			if(args && args.user){
				this.loggedIn = true;
				this.state.go('app.dashboard');
			}else {
				this.loggedIn = false;
			}
		});

		rootScope.$on(AuthEvents.logoutSuccess, (ev, args) => {
		  this.state.go('login');        
		});

		rootScope.$on('$stateChangeSuccess', (event: angular.IAngularEvent) => {
			let hash = window.location.hash;
			let routeName = routeFinder.getRoute(hash);
			this.currentRouteName = routeName;
		});
	}

	signout() {
		authToken.destroyT();
		rootScope.$broadcast(AuthEvents.logoutSuccess);
	}	
}

MasterCtrl.$inject = ['$http', '$rootScope', '$state', 'RouteFinder', 'AuthToken'];
export { MasterCtrl };