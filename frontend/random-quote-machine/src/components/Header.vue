<template>
    <header>
        <h1>{{ projectTitle }}</h1>
    </header>
</template>

<script>
export default {
    props: {
        projectTitle: {
            type: String,
            required: true
        }
    }
};
</script>
