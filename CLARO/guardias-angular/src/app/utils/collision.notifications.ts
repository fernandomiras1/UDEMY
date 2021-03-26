


export function IDguardsReplaced(currentUserID, selection, solutions) {
    if(selection === 'collision_user' || selection == null) {
      return [...new Set(
          solutions
          .filter(c => c.id_asignation_user_update == currentUserID)
          .map( c => c.id_previus_user )
        )
      ];
    }
    return [];
}

export function getUserByIdFromCollisions(id, collisions) {
    for (let collision of collisions) {
        let previous = collision.values.find(value => {
            if (value.previous_user.data_user.id_user == id) {
                return value;
            }
         });

        if (previous) {
            const {id_user, nombre, apellido} = previous.previous_user.data_user;
            return {id_user, nombre, apellido};
        }
    }
  }