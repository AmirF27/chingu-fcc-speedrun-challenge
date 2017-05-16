<template>
    <footer class="fixed-bottom">
        <div class="container center-text">
            <p class="right">
                View <a :href="sourceCodeUrl" target="_blank">
                    <i class="fa fa-github"
                        aria-hidden="true">
                    </i> source code</a>
                for this project.
            </p>
            <p class="left copyright">&copy; 2017 Amir F.</p>
        </div>
    </footer>
</template>

<script>
export default {
    props: {
        cert: {
            type: String,
            required: true
        },
        project: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            repoUrl: "https://github.com/AmirF27/chingu-fcc-speedrun-challenge/tree/master"
        };
    },
    computed: {
        sourceCodeUrl() {
            return `${this.repoUrl}/${this.cert}/${this.project}`;
        }
    }
};
</script>
