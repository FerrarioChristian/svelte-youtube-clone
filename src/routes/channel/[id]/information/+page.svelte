<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Informazioni</h1>
<h3>{data.user.firstName} {data.user.lastName}</h3>
<p>Age: {data.user.age}</p>
<p>Email: {data.user.email}</p>
<p>Gender: {data.user.gender}</p>
<p>Phone: {data.user.phone}</p>
<p>Birthdate: {data.user.birthDate}</p>
