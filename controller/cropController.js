$(document).ready(function () {
    var crops = [];
    var editIndex = -1;

    // Save or Update Crop
    $('#cropForm').submit(function (e) {
        e.preventDefault();

        var cropName = $('#cropName').val();
        var season = $('#Season').val();
        var scientificName = $('#ScientificName').val();
        var field = $('#field').val();

        // Handle image upload
        var imageFile = $('#CropImage')[0].files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = e.target.result;

            if (editIndex === -1) {
                var newCrop = {
                    id: crops.length + 1,
                    name: cropName,
                    season: season,
                    scientificName: scientificName,
                    image: image,
                    field: field,
                };
                crops.push(newCrop);
            } else {
                crops[editIndex].name = cropName;
                crops[editIndex].season = season;
                crops[editIndex].scientificName = scientificName;
                crops[editIndex].image = image;
                crops[editIndex].field = field;
                editIndex = -1;
            }

            $('#cropModal').modal('hide');
            $('#cropForm')[0].reset();
            renderTable();
        };

        reader.readAsDataURL(imageFile);
    });

    // Edit Crop
    $(document).on('click', '.edit-btn', function () {
        var id = $(this).data('id');
        editIndex = crops.findIndex((crop) => crop.id === id);
        var crop = crops[editIndex];
        $('#cropName').val(crop.name);
        $('#Season').val(crop.season);
        $('#ScientificName').val(crop.scientificName);
        $('#field').val(crop.field);
        $('#cropModalLabel').text('Edit Crop');
        $('#cropModal').modal('show');
    });

    // Delete Crop
    $(document).on('click', '.delete-btn', function () {
        var id = $(this).data('id');
        crops = crops.filter((crop) => crop.id !== id);
        renderTable();
    });

    // Render Table
    function renderTable() {
        $('#cropTable tbody').empty();
        crops.forEach((crop) => {
            $('#cropTable tbody').append(`
                <tr>
                    <td>${crop.id}</td>
                    <td>${crop.name}</td>
                    <td>${crop.season}</td>
                    <td>${crop.scientificName}</td>
                    <td><img src="${crop.image} "class="table-img"" onclick="showPopup('${crop.image}')"></td>
                    <td>${crop.field}</td>
                    <td>
                        <button class="btn btn-primary edit-btn" data-id="${crop.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${crop.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Show Image Popup
    window.showPopup = function (src) {
        $('#popupImage').attr('src', src);
        $('#imagePopup').show();
    };
});
