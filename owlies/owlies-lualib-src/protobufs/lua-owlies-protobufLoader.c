#include "lua-seri.h"

#include <lua.h>
#include <lauxlib.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

static int
testFunction (lua_State *L) {
	printf("test function called\n");
	return 0;
}

int
luaopen_owlies_protobufLoader(lua_State *L) {
	luaL_checkversion(L);

	luaL_Reg l[] = {
		{ "testFunction" , testFunction },
		{ NULL, NULL },
	};

	luaL_newlib(L, l);

	return 1;
}