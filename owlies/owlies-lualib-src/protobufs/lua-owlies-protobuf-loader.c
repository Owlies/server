#include "lua-seri.h"

#include <lua.h>
#include <lauxlib.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

static int
testFunction (lua_State *L) {
	printf("test function called\n");
	return 1;
}

int
luaopen_owlies_protobuf_loader(lua_State *L) {
	luaL_checkversion(L);

	luaL_Reg l[] = {
		{ "send" , testFunction },
		{ NULL, NULL },
	};

	luaL_newlibtable(L, l);

	lua_getfield(L, LUA_REGISTRYINDEX, "skynet_context");
	struct skynet_context *ctx = lua_touserdata(L,-1);
	if (ctx == NULL) {
		return luaL_error(L, "Init skynet context first");
	}

	luaL_setfuncs(L,l,1);

	return 1;
}