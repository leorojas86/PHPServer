class Guid {

  static _s4() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	static generateNewGUID() {
	   return (GUIDUtils._s4() + GUIDUtils._s4() + "-" + GUIDUtils._s4() + "-" + GUIDUtils._s4() + "-" + GUIDUtils._s4() + "-" + GUIDUtils._s4() + GUIDUtils._s4() + GUIDUtils._s4()).toLowerCase();
	}

}
