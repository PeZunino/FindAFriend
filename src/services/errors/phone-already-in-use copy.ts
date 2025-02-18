export class PhoneAlreadyInUseError extends Error{
	constructor(){
		super('Phone already in use');
	}
}