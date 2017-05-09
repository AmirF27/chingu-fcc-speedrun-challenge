<template>
    <header>
        <div class="container">
            <h1 class="center-text title">{{ projectTitle }}</h1>
        </div>
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
