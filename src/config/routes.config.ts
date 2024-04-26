class ROUTES {
	private root = '/'

	Home = this.root
	Login = `${this.root}/auth/login`
	Register = `${this.root}/auth/login`
	Users = `${this.root}/users`
	Profile = `${this.root}/profile`
	Athletes = `${this.root}/athletes`
	Competitions = `${this.root}/competitions`
}

export const Routes = new ROUTES()
