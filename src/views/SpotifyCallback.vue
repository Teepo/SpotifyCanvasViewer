<script setup>

import { useRouter } from 'vue-router';

import { setAuthorizeCode } from '../services/spotify';

setAuthorizeCode();

const router = useRouter();

router.push({ name: 'current' });

</script>
