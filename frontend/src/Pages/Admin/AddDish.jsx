import { useState, useActionState, useRef } from 'react';
import { addDish } from '../../api/itemApi';
import { 
  Utensils, 
  FileText, 
  DollarSign, 
  Tag, 
  Image as ImageIcon,
  X,
  Check,
  AlertCircle,
  Upload,
  Loader2,
  Leaf
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddDish = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef(null);
  const maxChars = 500;

  const handleform = async (prevState, formdata) => {
    const dishName = formdata.get('dishName')?.trim();
    const description = formdata.get('description')?.trim();
    const price = formdata.get('price');
    const category = formdata.get('category');
    const images = formdata.get('image');

    let errors = {};

    if (!dishName) errors.dishName = 'Dish name is required';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price is required';
    if (price && parseFloat(price) <= 0) errors.price = 'Price must be greater than 0';
    if (!category) errors.category = 'Category is required';
    if (!images || images.size === 0) errors.image = 'Please select an image';

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        enteredvalue: {
          dishName,
          description,
          price,
          category,
        }
      };
    }

    const newFormData = new FormData();
    newFormData.append('dishName', dishName);
    newFormData.append('description', description);
    newFormData.append('price', price);
    newFormData.append('category', category);
    newFormData.append("image", images);

    try {
      await addDish(newFormData);
      setFileName('');
      setImagePreview(null);
      setCharCount(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return { 
        success: true,
        errors: null,
        enteredvalue: null
      };
    } catch (error) {
      return {
        success: false,
        errors: { submit: error.message || 'Failed to add dish. Please try again.' },
        enteredvalue: {
          dishName,
          description,
          price,
          category,
        }
      };
    }
  };

  const [formState, formAction, isPending] = useActionState(handleform, { 
    errors: null,
    success: false,
    enteredvalue: null 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFileName('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDescriptionChange = (e) => {
    setCharCount(e.target.value.length);
  };

  const categories = [
    { value: 'appetizer', label: 'Appetizer', icon: '🍤', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { value: 'main course', label: 'Main Course', icon: '🍖', color: 'bg-green-50 text-green-700 border-green-200' },
    { value: 'dessert', label: 'Dessert', icon: '🍰', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    { value: 'beverage', label: 'Beverage', icon: '🍹', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { value: 'soup', label: 'Soup', icon: '🥣', color: 'bg-lime-50 text-lime-700 border-lime-200' },
    { value: 'salad', label: 'Salad', icon: '🥗', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center p-4 md:p-6 bg-linear-to-br from-emerald-50/80 via-white to-green-50/80">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-3xl relative animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-emerald-50/50 overflow-hidden">
          
          {/* Header - Green Theme */}
          <div className="relative bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 px-8 py-6 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Add New Dish
                    </h2>
                    <p className="text-white/70 text-xs mt-0.5">
                      Create a delicious addition to your menu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {formState?.success && (
            <div className="mx-6 mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-slideDown">
              <div className="p-1.5 bg-emerald-100 rounded-full">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium text-emerald-800 text-sm">Dish Added Successfully!</p>
                <p className="text-xs text-emerald-600">Your new dish has been added to the menu.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Dish Name */}
                <div>
                  <label htmlFor="dishName" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                    Dish Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="dishName"
                    name="dishName"
                    placeholder="e.g., Margherita Pizza"
                    defaultValue={formState?.enteredvalue?.dishName || ''}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm transition-all duration-200
                      ${formState?.errors?.dishName 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                      } focus:outline-none placeholder:text-gray-400`}
                  />
                  {formState?.errors?.dishName && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.dishName}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-teal-500" />
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={formState?.enteredvalue?.category || ''}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm transition-all duration-200 appearance-none bg-gray-50/50
                      ${formState?.errors?.category 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100'
                      } focus:outline-none cursor-pointer`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  {formState?.errors?.category && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.category}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-green-500" />
                    Price <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      defaultValue={formState?.enteredvalue?.price || ''}
                      className={`w-full pl-7 pr-3.5 py-2.5 border rounded-xl text-sm transition-all duration-200
                        ${formState?.errors?.price 
                          ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
                          : 'border-gray-200 bg-gray-50/50 focus:border-green-400 focus:ring-2 focus:ring-green-100'
                        } focus:outline-none placeholder:text-gray-400`}
                    />
                  </div>
                  {formState?.errors?.price && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label htmlFor="description" className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <FileText className="w-3.5 h-3.5 text-lime-500" />
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your dish in detail..."
                    rows="4"
                    maxLength={maxChars}
                    defaultValue={formState?.enteredvalue?.description || ''}
                    onChange={handleDescriptionChange}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm transition-all duration-200 resize-none
                      ${formState?.errors?.description 
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 bg-gray-50/50 focus:border-lime-400 focus:ring-2 focus:ring-lime-100'
                      } focus:outline-none placeholder:text-gray-400`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-400">
                      {formState?.errors?.description && (
                        <span className="flex items-center gap-1 text-red-500">
                          <AlertCircle className="w-3 h-3" />
                          {formState.errors.description}
                        </span>
                      )}
                    </p>
                    <span className={`text-xs ${charCount > maxChars * 0.8 ? 'text-lime-500' : 'text-gray-400'}`}>
                      {charCount}/{maxChars}
                    </span>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
                    Upload Image <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="image"
                      id="fileInput"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {!imagePreview ? (
                      <label
                        htmlFor="fileInput"
                        className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
                          ${formState?.errors?.image 
                            ? 'border-red-300 bg-red-50 hover:border-red-400' 
                            : 'border-gray-200 bg-gray-50/50 hover:border-emerald-300 hover:bg-emerald-50/30'
                          } hover:shadow-sm`}
                      >
                        <div className="p-2 bg-gray-100/50 rounded-full mb-1.5">
                          <Upload className={`w-5 h-5 ${formState?.errors?.image ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <p className="text-xs font-medium text-gray-600">Click to upload image</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP (Max 5MB)</p>
                      </label>
                    ) : (
                      <div className="relative group">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-40 object-cover rounded-xl border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-[10px]">
                          {fileName}
                        </div>
                      </div>
                    )}
                  </div>
                  {formState?.errors?.image && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {formState.errors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {formState?.errors?.submit && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {formState.errors.submit}
              </div>
            )}

            {/* Submit Button - Green Theme */}
            <button
              type="submit"
              className="w-full mt-5 py-3.5 bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Adding Dish...
                </>
              ) : (
                <>
                  <Leaf className="w-4 h-4" />
                  Add Dish to Menu
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDish;