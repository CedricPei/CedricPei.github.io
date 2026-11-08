(function () {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    document.querySelectorAll('[data-united-crest]').forEach(function (button) {
        var image = button.querySelector('.united-crest-image')
        var status = button.parentElement.querySelector('.united-status')
        var resetTimer

        function spin(announce) {
            if (button.classList.contains('is-spinning')) return

            button.classList.add('is-spinning')
            if (announce && status) status.textContent = 'Manchester United!'

            window.clearTimeout(resetTimer)
            resetTimer = window.setTimeout(function () {
                button.classList.remove('is-spinning')
                if (status) status.textContent = ''
            }, reducedMotion.matches ? 650 : 1200)
        }

        button.addEventListener('click', function () {
            spin(true)
        })

        function playWelcome() {
            if (reducedMotion.matches || document.hidden) return
            window.setTimeout(function () { spin(false) }, 200)
        }

        if (image.complete && image.naturalWidth > 0) {
            playWelcome()
        } else {
            image.addEventListener('load', playWelcome, { once: true })
        }
    })

    document.querySelectorAll('[data-siu-celebration]').forEach(function (button) {
        var status = button.parentElement.querySelector('.siu-status')
        var image = button.querySelector('.siu-player')
        var resetTimer

        function celebrate(announce) {
            if (button.classList.contains('is-celebrating')) return

            button.classList.add('is-celebrating')
            if (announce && status) status.textContent = 'Siuuu!'

            window.clearTimeout(resetTimer)
            resetTimer = window.setTimeout(function () {
                button.classList.remove('is-celebrating')
                if (status) status.textContent = ''
            }, reducedMotion.matches ? 900 : 1600)
        }

        button.addEventListener('click', function () {
            celebrate(true)
        })

        function playWelcome() {
            if (reducedMotion.matches || document.hidden) return
            window.setTimeout(function () { celebrate(false) }, 500)
        }

        if (image.complete && image.naturalWidth > 0) {
            playWelcome()
        } else {
            image.addEventListener('load', playWelcome, { once: true })
        }
    })
})()
