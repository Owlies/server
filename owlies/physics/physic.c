 
#include <stdio.h>

#include <lua.h>
#include <lauxlib.h>

static int testprint()
{
	printf("interesting!\n");
	return 0;
}

int luaopen_owlies_physic(lua_State *L) {
	luaL_checkversion(L);

	luaL_Reg l[] = {
		{ "testprint" , testprint },
		{ NULL, NULL },
	};

	luaL_newlib(L, l);

	return 1;
}