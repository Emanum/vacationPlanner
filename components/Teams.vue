<script setup lang="ts">
const supabase = useSupabaseClient()

const loading = ref(true)
const newTeamName = ref('')

class Team {
  id: number
  name: string
  created_at: Date
  members: Array<{ id: string, name: string, type: string }>

  constructor(id: number, name: string, created_at: Date) {
    this.id = id
    this.name = name
    this.created_at = created_at
    this.members = []
  }

  addMember(id: string, name: string, type: string) {
    this.members.push({id, name, type})
  }
}

const teams = ref([]) as Ref<Array<Team>>

//load from team_membership (user_id, team_id, type)
//then load from teams (id, name, created_at)
const {data, error} = await supabase
    .from('team_membership_details')
    .select()


if (error) console.error(error)

// no filter because row level security is applied
if (data && data.length > 0) {
  //now load the team names
  console.info(data)
  //
  // //@ts-ignore
  // let unique_team_ids = [...new Set(data.map((item) => item.team_id))]
  // //@ts-ignore
  // const {data, error} = await supabase
  //     .from('teams')
  //     .select(`id, name, created_at`)
  //     .in('id', unique_team_ids)
  // if (data) {
  //   //@ts-ignore
  //   teams.value = data
  // }
}

async function createTeam(team_name: string) {
  let {data, error} = await supabase
      //@ts-ignore
      .rpc('insert_team_and_assign_manager', {team_name})
  if (error) console.error(error)
  else console.log(data)
}

</script>

<!-- Allows to create a new team and see the team you are part of -->
<template>
  <div>
    <h1>Teams</h1>
    <div>
      <h2>Create a new team</h2>
      <input type="text" placeholder="Team name" v-model="newTeamName"/>
      <button @click="createTeam(newTeamName)">Create</button>
    </div>
    <div>
      <h2>My teams</h2>
      <ul>
        <li v-for="team in teams" :key="team.id">
          <p>{{ team.name }}</p>
          <p>{{ team.created_at }}</p>
          <ul>
            <li v-for="member in team.members" :key="member.id">
              <p>{{ member.name }}</p>
              <p>{{ member.type }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>
